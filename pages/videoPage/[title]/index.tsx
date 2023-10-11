'use client'
import styles from './videoPage.module.css'
import { useEffect, useState } from 'react'
import disney from '../../../data/disney.json'
import disneyTrailers from '../../../data/disneyTrailers.json'
import Modal from 'react-modal'
import { useRouter } from 'next/router'
import Like from '../../../components/icons/like-icon'
import NavBar from '@/components/navBar/NavBar'
import Head from 'next/head'
import Loading from '@/components/loading/loading'
import Link from 'next/link'

interface disneyInterface {
    snippet: {
        title: string
        thumbnails: {
            high: {
                url: string
            }
        }
        publishTime: string
        description: string
    }
    id: {
        videoId: string
    }
}

const VideoPage = () => {
    const [video, setVideo] = useState<disneyInterface>()
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const { title } = router.query
    const { name } = router.query
    const [storedUsername, setStoredUsername] = useState('')
    const status = name || storedUsername ? 'Sign Out' : 'Sign In'
    const [liked, setLiked] = useState<boolean>()

    const handleLocation = () => {
        if (storedUsername) {
            localStorage.clear()
            router.push('/')
        } else if (name) {
            router.push('/')
            localStorage.clear()
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
        const likedVideosStr = localStorage.getItem('likedVideos')
        if (likedVideosStr) {
            const likedVideosArray = JSON.parse(likedVideosStr)
            if (likedVideosArray.includes(title)) {
                setLiked(true)
            } else setLiked(false)
        }
    }, [title])

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setLoading(false)
        }, 1100)
        return () => clearTimeout(loadingTimeout)
    }, [])

    useEffect(() => {
        const foundVideo = disney.items.find((item) => item.snippet.title === title)

        if (typeof foundVideo !== 'undefined') {
            setVideo(foundVideo)
        } else {
            const foundTrailer = disneyTrailers.items.find((item) => item.snippet.title === title)
            if (typeof foundTrailer !== 'undefined') {
                setVideo(foundTrailer)
            }
        }
    }, [title])

    const handleVideoLike = (title: any) => {
        let likedVideosArray: string[] = []

        const likedVideosStr = localStorage.getItem('likedVideos')
        if (likedVideosStr) {
            likedVideosArray = JSON.parse(likedVideosStr)
        }

        if (!liked) {
            setLiked(true)
            likedVideosArray.push(title)
            localStorage.setItem('likedVideos', JSON.stringify(likedVideosArray))
        } else {
            setLiked(false)
            const indexToRemove = likedVideosArray.indexOf(title)
            if (indexToRemove !== -1) {
                likedVideosArray.splice(indexToRemove, 1)
                localStorage.setItem('likedVideos', JSON.stringify(likedVideosArray))
            }
        }
    }

    return (
        <div className={styles.wrapper}>
            {storedUsername || name ? (
                <>
                    <Head>
                        <title>Netflix</title>
                    </Head>
                    {loading ? (
                        <Loading />
                    ) : video ? (
                        <div className={styles.container}>
                            <NavBar
                                userName={name || storedUsername}
                                RegistrationStatus={status}
                                location={handleLocation}
                            />
                            <Modal
                                isOpen={true}
                                contentLabel='Watch the video'
                                onRequestClose={() => router.back()}
                                className={styles.modal}
                                overlayClassName={styles.overlay}
                            >
                                <iframe
                                    style={{ border: 'none', borderRadius: '10px 10px 0 0' }}
                                    width='100%'
                                    height='360'
                                    src={video?.id.videoId}
                                    title='YouTube video player'
                                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                                ></iframe>

                                <div className={styles.likeDislikeBtnWrapper}>
                                    <button
                                        onClick={() => handleVideoLike(title)}
                                        className={liked ? styles.likeBtnActive : styles.likeBtn}
                                    >
                                        <div className={liked ? styles.liked : ''}>
                                            <Like />
                                        </div>
                                    </button>
                                </div>
                                <div className={styles.modalBody}>
                                    <div className={styles.modalBodyContent}>
                                        <div className={styles.col1}>
                                            <p className={styles.publishTime}>{video?.snippet.publishTime}</p>
                                            <p className={styles.title}>{title}</p>
                                            <p className={styles.description}>{video?.snippet.description}</p>
                                        </div>
                                        <div className={styles.col2}>
                                            <p className={styles.subText}>
                                                <span className={styles.textColor}>movie: </span>
                                                <span className={styles.channelTitle}>{video?.snippet.title}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    ) : (
                        <div className={styles.errorPageWrapper}>
                            <div className={styles.errorText}>
                                <h2 className={styles.errorTitle}>Sorry...</h2>
                                <span className={styles.errorSubTitle}>Video Not Found</span>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className={styles.errorPageWrapper}>
                    <div className={styles.errorText}>
                        <h2 className={styles.errorTitle}>Sorry...</h2>
                        <span className={styles.SignInText}>
                            <Link className={styles.SignInLink} href={'/SignIn'}>
                                Sign in
                            </Link>{' '}
                            to view
                        </span>
                        <span className={styles.SignInText}>
                            or go back to{' '}
                            <Link className={styles.SignInLink} href={'/'}>
                                {' '}
                                home
                            </Link>
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default VideoPage
