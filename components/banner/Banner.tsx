'use client'
import { FC, useState } from 'react'
import styles from './Banner.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface Props {
    videos: any[]
}

const Banner: FC<Props> = ({ videos }) => {
    const router = useRouter()
    const { name } = router.query
    const storedName = typeof window !== 'undefined' ? localStorage.getItem('username') : undefined
    const [showModal, setShowModal] = useState(false)

    const handleCardClick = (video: { title: string }) => {
        if (name || storedName) {
            router.push({
                pathname: `/videoPage/${video.title}`,
                query: { name },
            })
        } else {
            setShowModal(true)
        }
    }

    return (
        <div className={styles.mainWrapper}>
            {showModal && <div className={styles.overlay}></div>}
            {videos.map(
                (video, index) =>
                    index == 0 && (
                        <>
                            <div className={styles.leftWrapper}>
                                <div className={styles.left}>
                                    <h3 className={styles.title}>{video.title}</h3>
                                    <h3 className={styles.subTitle}>{video.subTitle}</h3>
                                    <div className={styles.buttonWrapper}>
                                        <button className={styles.button} onClick={() => handleCardClick(video)}>
                                            <Image
                                                src={'/static/play-arrow.svg'}
                                                alt={'Play icon'}
                                                width={32}
                                                height={32}
                                                sizes='(min-width: 32px)'
                                            />
                                            <span className={styles.playText}>Play</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.bannerImg} style={{ backgroundImage: `url(${video.imgUrl})` }}></div>
                            {showModal && (
                                <div className={styles.modal}>
                                    <div className={styles.modalContent}>
                                        <div>
                                            <p className={styles.modalText}>Account is needed to view this video</p>
                                            <p className={styles.modalText}>
                                                Click to{' '}
                                                <Link href={'/SignIn'} className={styles.modalLink}>
                                                    Sign In
                                                </Link>
                                            </p>
                                        </div>
                                        <button className={styles.modalCloseBtn} onClick={() => setShowModal(false)}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )
            )}
        </div>
    )
}

export default Banner
