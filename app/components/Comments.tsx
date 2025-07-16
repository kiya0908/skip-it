"use client";

import React, { useState, useEffect } from 'react';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies?: Comment[];
}

interface CommentsProps {
  gameSlug?: string; // Optional game identifier for different page comments
  title?: string; // Comments section title
}

export default function Comments({ gameSlug = 'homepage', title = 'Comments' }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  // Load comments from localStorage
  useEffect(() => {
    const savedComments = localStorage.getItem(`comments_${gameSlug}`);
    if (savedComments) {
      try {
        const parsed = JSON.parse(savedComments);
        // Convert timestamps to Date objects
        const commentsWithDates = parsed.map((comment: any) => ({
          ...comment,
          timestamp: new Date(comment.timestamp),
          replies: comment.replies?.map((reply: any) => ({
            ...reply,
            timestamp: new Date(reply.timestamp)
          })) || []
        }));
        setComments(commentsWithDates);
      } catch (error) {
        console.error('Failed to load comments:', error);
      }
    }
  }, [gameSlug]);

  // Save comments to localStorage
  const saveComments = (updatedComments: Comment[]) => {
    localStorage.setItem(`comments_${gameSlug}`, JSON.stringify(updatedComments));
    setComments(updatedComments);
  };

  // Submit new comment
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;

    setIsSubmitting(true);
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: authorName.trim(),
      content: newComment.trim(),
      timestamp: new Date(),
      likes: 0,
      replies: []
    };

    const updatedComments = [comment, ...comments];
    saveComments(updatedComments);
    
    setNewComment('');
    setAuthorName('');
    setIsSubmitting(false);
  };

  // Submit reply
  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim() || !authorName.trim()) return;

    const reply: Comment = {
      id: Date.now().toString(),
      author: authorName.trim(),
      content: replyContent.trim(),
      timestamp: new Date(),
      likes: 0
    };

    const updatedComments = comments.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        };
      }
      return comment;
    });

    saveComments(updatedComments);
    setReplyContent('');
    setReplyingTo(null);
  };

  // Like functionality
  const handleLike = (commentId: string, isReply: boolean = false, parentId?: string) => {
    const updatedComments = comments.map(comment => {
      if (isReply && comment.id === parentId) {
        return {
          ...comment,
          replies: comment.replies?.map(reply => 
            reply.id === commentId 
              ? { ...reply, likes: reply.likes + 1 }
              : reply
          ) || []
        };
      } else if (!isReply && comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 };
      }
      return comment;
    });
    saveComments(updatedComments);
  };

  // Format time
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString('en-US');
  };

  return (
    <div className="max-w-[1920px] mx-auto px-2 sm:px-3 lg:px-4">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <i className="fas fa-comments text-blue-500 mr-2 text-sm"></i>
        {title} ({comments.length})
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-4">
        <div className="max-w-[1920px] mx-auto px-2 sm:px-3 lg:px-4">
          <input
            type="text"
            placeholder="Your name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <textarea
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim() || !authorName.trim()}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-1 rounded text-sm font-medium transition-colors"
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {comments.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <i className="fas fa-comment-slash text-2xl mb-2"></i>
            <p className="text-sm">No comments yet. Be the first!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-3 last:border-b-0">
              {/* Main Comment */}
              <div className="flex space-x-2">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {comment.author.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1 mb-1">
                    <h4 className="font-medium text-gray-900 text-sm truncate">{comment.author}</h4>
                    <span className="text-xs text-gray-500 flex-shrink-0">{formatTime(comment.timestamp)}</span>
                  </div>
                  <p className="text-gray-700 text-sm mb-2 leading-tight">{comment.content}</p>
                  <div className="flex items-center space-x-3 text-xs">
                    <button
                      onClick={() => handleLike(comment.id)}
                      className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <i className="fas fa-heart"></i>
                      <span>{comment.likes}</span>
                    </button>
                    <button
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      className="text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      <i className="fas fa-reply mr-1"></i>
                      Reply
                    </button>
                  </div>

                  {/* Reply Form */}
                  {replyingTo === comment.id && (
                    <div className="mt-2 ml-2 border-l-2 border-blue-200 pl-2">
                      <textarea
                        placeholder="Write your reply..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows={2}
                      />
                      <div className="flex justify-end space-x-1 mt-1">
                        <button
                          onClick={() => setReplyingTo(null)}
                          className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSubmitReply(comment.id)}
                          disabled={!replyContent.trim()}
                          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-2 py-1 rounded text-xs transition-colors"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Replies List */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-2 ml-2 space-y-2 border-l-2 border-gray-100 pl-2">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex space-x-2">
                          <div className="flex-shrink-0">
                            <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {reply.author.charAt(0).toUpperCase()}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-1 mb-1">
                              <h5 className="font-medium text-gray-900 text-xs truncate">{reply.author}</h5>
                              <span className="text-xs text-gray-500 flex-shrink-0">{formatTime(reply.timestamp)}</span>
                            </div>
                            <p className="text-gray-700 text-xs mb-1 leading-tight">{reply.content}</p>
                            <button
                              onClick={() => handleLike(reply.id, true, comment.id)}
                              className="flex items-center space-x-1 text-xs text-gray-500 hover:text-red-500 transition-colors"
                            >
                              <i className="fas fa-heart"></i>
                              <span>{reply.likes}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}