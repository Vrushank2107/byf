import { createFileRoute } from "@tanstack/react-router";
import { requireAdminAuth } from "@/lib/admin-auth";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Calendar, User, X } from "lucide-react";
import { toast } from "sonner";
import { ImageInput } from "@/components/admin/ImageInput";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";
import { useBlogStore, type BlogItem } from "@/lib/admin-store";
import { api } from "@/lib/api";

export const Route = createFileRoute("/admin/blog")({
  component: AdminBlog,
  ssr: false,
  beforeLoad: requireAdminAuth,
});

function AdminBlog() {
  const { data: posts, loading, refresh } = useBlogStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogItem | null>(null);
  const [saving, setSaving] = useState(false);
  const { confirm, dialog } = useConfirmDialog();

  const handleDelete = async (id: string) => {
    const ok = await confirm({
      title: "Delete blog post?",
      description: "Are you sure you want to delete this blog post? This action cannot be undone.",
    });
    if (!ok) return;
    try {
      await api.deleteBlogPost(id);
      refresh();
      toast.success("Blog post deleted");
    } catch (error) {
      console.error('Failed to delete blog post:', error);
      toast.error('Failed to delete blog post');
    }
  };

  const handleEdit = (post: BlogItem) => {
    setEditingPost(post);
    setShowAddForm(true);
  };

  const handleSave = async (post: BlogItem) => {
    if (!post.image) {
      await confirm({
        title: "Image required",
        description: "Please upload a photo before saving.",
        confirmLabel: "OK",
        cancelLabel: "Dismiss",
        variant: "default",
      });
      return;
    }

    if (post.image.startsWith("data:")) {
      await confirm({
        title: "Image still uploading",
        description: "Wait for the upload to finish, then try saving again.",
        confirmLabel: "OK",
        cancelLabel: "Dismiss",
        variant: "default",
      });
      return;
    }

    setSaving(true);
    try {
      if (editingPost && editingPost.id) {
        await api.updateBlogPost(editingPost.id, post);
        toast.success("Blog post updated");
      } else {
        await api.createBlogPost(post);
        toast.success("Blog post created");
      }
      setShowAddForm(false);
      setEditingPost(null);
      refresh();
    } catch (error) {
      console.error('Failed to save blog post:', error);
      const message = error instanceof Error ? error.message : "Failed to save blog post";
      await confirm({
        title: "Could not save blog post",
        description: message,
        confirmLabel: "OK",
        cancelLabel: "Dismiss",
        variant: "default",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      {dialog}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">Blog</h1>
            <p className="text-muted-foreground">Manage your blog posts</p>
          </div>
          <button
            onClick={() => {
              setEditingPost(null);
              setShowAddForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Post
          </button>
        </div>

        {showAddForm && (
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold">
                {editingPost ? "Edit Blog Post" : "Add New Blog Post"}
              </h2>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingPost(null);
                }}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <BlogForm
              post={editingPost}
              saving={saving}
              onSave={handleSave}
              onCancel={() => {
                setShowAddForm(false);
                setEditingPost(null);
              }}
            />
          </div>
        )}

        <div className="grid gap-4">
          {loading ? (
            <>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6 flex items-start justify-between gap-4">
                  <div className="flex gap-4 min-w-0">
                    <Skeleton className="w-20 h-20 rounded-lg shrink-0" />
                    <div className="min-w-0 flex-1">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                  </div>
                </div>
              ))}
            </>
          ) : posts.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-12 text-center">
              <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">No blog posts yet</h3>
              <p className="text-muted-foreground">Create your first blog post to get started</p>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-card border border-border rounded-xl p-6 flex items-start justify-between gap-4"
              >
                <div className="flex gap-4 min-w-0">
                  <img src={post.image} alt={post.title} className="w-20 h-20 rounded-lg object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground">{post.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {post.date}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-muted text-xs">
                        {post.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{post.excerpt}</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id || '')}
                    className="p-2 rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

function BlogForm({
  post,
  saving,
  onSave,
  onCancel,
}: {
  post: BlogItem | null;
  saving: boolean;
  onSave: (data: BlogItem) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<BlogItem>(
    post || {
      slug: "",
      title: "",
      excerpt: "",
      category: "",
      date: "",
      image: "",
      read: "5 min read",
    }
  );

  useEffect(() => {
    if (post) {
      // Convert ISO date to yyyy-MM-dd format for date input
      const dateForInput = post.date ? post.date.split('T')[0] : '';
      setFormData({ ...post, date: dateForInput });
    } else {
      setFormData({
        slug: "",
        title: "",
        excerpt: "",
        category: "",
        date: "",
        image: "",
        read: "5 min read",
      });
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.excerpt) return;
    // Convert yyyy-MM-dd to ISO format for backend
    const isoDate = new Date(formData.date).toISOString();
    onSave({ ...formData, date: isoDate, content: formData.content || undefined });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
              placeholder="e.g., my-first-post"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
              placeholder="e.g., Community, Education"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
              required
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold">Excerpt</label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
            rows={2}
            placeholder="Short summary for the blog card"
            required
          />
        </div>
        <ImageInput
          label="Image"
          value={formData.image}
          onChange={(image) => setFormData({ ...formData, image })}
          folder="blog"
        />
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
  );
}
