import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../fireBaseConfig'

export default function ViewAllPost() {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            const querySnapShot = await getDocs(collection(db, "Post"))
            const fetchPost = []
            querySnapShot.forEach(doc => {
                const recond = doc.data()
                console.log("recond", recond);
                fetchPost.push({
                    "title": recond.title,
                    "description": recond.description,
                    "imageUrl": recond.imageUrl,
                    "titluserIde": recond.userId,
                })
            });
            setPosts(fetchPost)
        }
        const fetchUser = async () => {
            const querySnapshots = await getDocs(collection(db, "Student"))
            const user = {}
            querySnapshots.forEach((doc) => {
                const record = doc.data();
                user[doc.id] = record.name
            })
            setUser(user)
        }
        fetchData()
        fetchUser()
    }, [])
    return (
        <div>
            {posts.length == 0 ? <h1>no data found</h1> : posts.map((singlePost, i) => {
                return <div key={i}>
                    <h2>{singlePost?.title}</h2>
                    <h2>post by : {singlePost?.titluserIde}</h2>
                    <h2>post by : {user[singlePost?.titluserIde]}</h2>
                    <p>description : {singlePost?.description}</p>
                    <img src={singlePost?.imageUrl} height={50} width={50} alt="" />
                </div>
            })}
        </div>
    )
}
