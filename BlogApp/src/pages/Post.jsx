import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            setLoading(true);
            setError(null);
            appwriteService.getPost(slug)
            .then((post) => {
                if (post) setPost(post);
                else navigate("/");
            })
            .catch((err) => {
                console.error('getPost error', err);
                setError('Failed to load post');
            })
            .finally(() => setLoading(false));
        } else navigate("/");
    }, [slug, navigate]);

    const [showConfirm, setShowConfirm] = useState(false);

    const confirmDelete = () => {
        if (!post) return;
        setShowConfirm(true);
    };

    const cancelDelete = () => {
        setShowConfirm(false);
    };

    const performDelete = async () => {
        if (!post) return;
        setShowConfirm(false);
        try {
            const status = await appwriteService.deletePost(post.$id);
            if (status) {
                if (post.featuredImage) {
                    try {
                        await appwriteService.deleteFile(post.featuredImage);
                    } catch (e) {
                        console.warn('Failed to delete featured image', e);
                    }
                }
                navigate('/');
            } else {
                setError('Failed to delete post');
            }
        } catch (err) {
            console.error('deletePost error', err);
            setError('Failed to delete post');
        }
    };

    if (loading) {
        return (
            <div className="py-8 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-400" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-8">
                <div className="text-center text-rose-400">{error}</div>
            </div>
        );
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {post.featuredImage ? (
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl"
                        />
                    ) : (
                        <div className="rounded-xl bg-slate-800 w-full h-64 flex items-center justify-center text-slate-400">No Image</div>
                    )}

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button textColor="text-slate-900" bgColor="bg-yellow-400" className="mr-3 font-semibold">
                                    Edit
                                </Button>
                            </Link>
                            <Button className="font-semibold" bgColor="bg-rose-500" onClick={confirmDelete}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold text-slate-100">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
                {/* Confirmation modal */}
                {showConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={cancelDelete}></div>
                        <div className="relative z-10 max-w-xl w-full mx-4">
                                <div className="transform transition-transform duration-200 ease-out hover:scale-[1.01] bg-slate-900/30 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl">
                                <div
                                    className="px-6 py-5"
                                    style={{
                                        background: 'linear-gradient(160deg, #0f1724 0%, #4C1D95 60%, #6D28D9 100%)'
                                    }}
                                >
                                    <h3 className="text-lg font-semibold text-slate-50 text-center">Delete post</h3>
                                </div>
                                <div className="p-6 bg-slate-900/40">
                                    <p className="text-slate-200 mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
                                    <div className="flex justify-center gap-4">
                                        <button onClick={cancelDelete} className="inline-flex items-center px-4 py-2 rounded-md text-white bg-violet-400 hover:bg-violet-300 focus:outline-none">Cancel</button>
                                        <button onClick={performDelete} className="inline-flex items-center px-4 py-2 rounded-md text-white bg-rose-500 hover:bg-rose-400 focus:outline-none">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    ) : null;
}