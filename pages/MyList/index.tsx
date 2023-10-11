import styles from './MyList.module.css'
import { useEffect, useState } from 'react'
import { getDisneyVideos } from '@/lib/organizedData'
import Card from '@/components/card/Card'
import { useRouter } from 'next/router'
import NavBar from '@/components/navBar/NavBar'
import SectionCards from '@/components/sectionCards/sectionCards'

const MyListPage = () => {
    const [storedVideoTitle, setStoredVideoTitle] = useState([])
    const disneyVideos = getDisneyVideos()
    const router = useRouter()
    const { transferUserName } = router.query
    const [storedUsername, setStoredUsername] = useState('')
    const status = transferUserName || storedUsername ? 'Sign Out' : 'Sign In'

    const handleLocation = () => {
        if (storedUsername) {
            window.location.reload()
            localStorage.clear()
            router.push('/MyList')
            localStorage.clear()
        } else if (transferUserName) {
            router.push('/MyList')
        } else {
            router.push('/SignIn')
        }
    }

    useEffect(() => {
        const storedName = localStorage.getItem('username')
        if (storedName) {
            setStoredUsername(storedName)
        }
    }, [])

    useEffect(() => {
        const storedVideo = localStorage.getItem('likedVideos')
        if (storedVideo) {
            const likedVideoTitles = JSON.parse(storedVideo)
            setStoredVideoTitle(likedVideoTitles)
        }
    }, [])

    const LikedVideos = storedVideoTitle.map((likedTitle: string) =>
        disneyVideos.find((video) => video.title === likedTitle)
    )

    return (
        <div className={styles.wrapper}>
            <NavBar
                userName={transferUserName || storedUsername || 'UserName'}
                RegistrationStatus={status}
                location={handleLocation}
            />{' '}
            <div className={styles.sectionWrapper}>
                {LikedVideos.length === 0 ? (
                    <div className={styles.noSavedVideosText}>No liked videos here...</div>
                ) : (
                    LikedVideos.reverse().map((video, index) => (
                        <div className={styles.cardWrapper}>
                            <Card
                                key={index}
                                onClick={() => router.push(`/videoPage/${video?.title}`)}
                                imgUrl={video?.imgUrl}
                                size={'large'}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default MyListPage
