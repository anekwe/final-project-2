import React, { useState, useEffect } from 'react';
import { db, NewsBlog } from '../../lib/db';
import { Plus, X, Trash2, Link as LinkIcon } from 'lucide-react';
import { format } from 'date-fns';

export default function NewsManagement() {
  const [news, setNews] = useState<NewsBlog[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: 'Admin',
    image_url: ''
  });

  const fetchNews = async () => {
    const data = await db.getNews();
    setNews(data);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await db.addNews(formData);
    setShowForm(false);
    fetchNews();
    alert("Post published successfully");
    setFormData({ title: '', content: '', author: 'Admin', image_url: '' });
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await db.deleteNews(id);
      fetchNews();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">News & Blog Manager</h1>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-[var(--color-army-dark)] text-white rounded-lg hover:bg-[var(--color-army-base)] transition-colors font-semibold shadow-sm"
        >
          <Plus size={18} /> <span>Create Post</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 relative">
          <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
             <X size={24} />
          </button>
          <h2 className="text-xl font-bold text-gray-800 mb-6">New Blog Post</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Post Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-army-base)]" />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Content (Rich Text Simulation)</label>
              <textarea name="content" value={formData.content} onChange={handleChange} required rows={6} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-army-base)] resize-none" placeholder="Write your post content here..."></textarea>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Author</label>
                  <input type="text" name="author" value={formData.author} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-army-base)]" />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Featured Image URL</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input type="url" name="image_url" value={formData.image_url} onChange={handleChange} placeholder="https://..." className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-army-base)]" />
                  </div>
               </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit" className="px-8 py-3 rounded-lg bg-[var(--color-army-dark)] text-white font-semibold hover:bg-[var(--color-army-base)] shadow-md">Publish Post</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.length === 0 && !showForm && (
           <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-gray-100 border-dashed">
             No posts found. Create your first news update!
           </div>
        )}
        
        {news.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
            {post.image_url && (
              <img src={post.image_url} alt={post.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-5">
              <div className="text-xs text-gray-500 mb-2 font-mono flex justify-between items-center">
                <span>{format(new Date(post.created_at), 'MMM dd, yyyy')}</span>
                <span className="bg-gray-100 px-2 py-1 rounded text-gray-600">{post.author}</span>
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-3 line-clamp-2">{post.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.content}</p>
              
              <div className="border-t border-gray-50 pt-4 flex justify-end">
                <button 
                  onClick={() => handleDelete(post.id, post.title)}
                  className="text-red-500 hover:text-red-700 flex items-center space-x-1 text-sm font-semibold"
                >
                  <Trash2 size={14} /> <span>Delete Post</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
