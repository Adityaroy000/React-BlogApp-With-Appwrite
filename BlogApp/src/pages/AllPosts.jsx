import React,{useState,useEffect} from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'

function AllPosts() {
        const [posts, setPosts] = useState([])
        const [loading, setLoading] = useState(true)
        const [error, setError] = useState(null)

        useEffect(() => {
                setLoading(true)
                setError(null)
                appwriteService.getPosts([])
                .then((posts)=>{
                        if(posts){
                                setPosts(posts.documents)
                        }
                })
                .catch((err)=>{
                        console.error('getPosts error', err)
                        setError('Failed to load posts')
                })
                .finally(()=>setLoading(false))
        },[])

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-400" />
                    </div>
                </Container>
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="text-rose-400">{error}</div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
                <Container>
                        {posts.length === 0 ? (
                                <div className="text-center text-slate-400">No posts yet — be the first to create one.</div>
                        ) : (
                            <div className='flex flex-wrap'>
                                    {posts.map((post)=>(
                                            <div key={post.$id} className='p-2 w-1/4'>
                                                    <PostCard {...post} />
                                            </div>
                                    ))}
                            </div>
                        )}
                </Container>
        </div>
    )
}

export default AllPosts