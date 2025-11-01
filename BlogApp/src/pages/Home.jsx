import React,{useState,useEffect} from 'react'
import appwriteService from '../appwrite/config'
import { Container,PostCard } from '../components'
import { useSelector } from 'react-redux'
function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const userData  = useSelector((state) => state.auth.userData)

    useEffect(() => {
      if(!userData){
        setPosts([])
        setLoading(false)
        setError(null)
        return
      }
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
    }, [userData])
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
                    <div className="text-red-500">{error}</div>
                </Container>
            </div>
        )
    }

    if(!userData){
        return (
            <div className="w-full py-16 mt-4 flex items-center justify-center">
                <Container>
                    <div className="max-w-xl mx-auto">
                        <div className="rounded-xl overflow-hidden shadow-lg">
                            <div className="px-6 py-5" style={{ background: 'linear-gradient(160deg,#1C1C1E 0%, #4C1D95 60%, #6D28D9 100%)' }}>
                                <h2 className="text-xl font-bold text-white text-center">Welcome to the Blog</h2>
                            </div>
                            <div className="bg-slate-800 p-6">
                                <p className="text-slate-300 mb-6 text-center">Please login or signup to read and create posts. Join the community and start sharing your thoughts.</p>
                                <div className="flex justify-center gap-4">
                                    <a href="/login" className="inline-flex items-center px-4 py-2 rounded-md text-white bg-violet-400 hover:bg-violet-300">Login</a>
                                    <a href="/signup" className="inline-flex items-center px-4 py-2 rounded-md text-slate-900 bg-yellow-400 hover:bg-yellow-300">Signup</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-16 mt-4 flex items-center justify-center">
                <Container>
                    <div className="text-center text-slate-400">No posts yet — be the first to create one.</div>
                </Container>
            </div>
        )
    }
    return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post)=>(
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
    )
}

export default Home