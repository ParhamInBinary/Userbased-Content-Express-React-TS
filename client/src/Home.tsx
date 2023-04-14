import { Post } from './Post'
import { CreatePost } from './CreatePost'


export function Home() {
    return (
        <div className="mainContainer" style={{ width: '60%'}}>
            <CreatePost />

            <div className="postContainer">
                <Post />
            </div>

        </div>
    )
}