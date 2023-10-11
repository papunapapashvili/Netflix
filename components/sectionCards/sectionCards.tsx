import { FC, useEffect, useRef, useState } from 'react'
import styles from './SectionCards.module.css'
import Card from '../card/Card'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Props {
    title: string
    size: any
    videos: any[]
    slice: number
}

const SectionCards: FC<Props> = ({ title, size, videos = [], slice }) => {
    const router = useRouter()
    const cardWrapperRef = useRef<HTMLDivElement>(null)
    const [isMobile, setIsMobile] = useState(false)
    const { name } = router.query
    const storedName = typeof window !== 'undefined' ? localStorage.getItem('username') : undefined
    const [showModal, setShowModal] = useState(false)

    const handleScrollLeft = () => {
        if (cardWrapperRef.current) {
            cardWrapperRef.current.scrollBy({
                left: -900,
                behavior: 'smooth',
            })
        }
    }

    const handleScrollRight = () => {
        if (cardWrapperRef.current) {
            cardWrapperRef.current.scrollBy({
                left: 900,
                behavior: 'smooth',
            })
        }
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 600)
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

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
        <section className={styles.wrapper}>
            {showModal && <div className={styles.overlay}></div>}
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.cardWrapper} ref={cardWrapperRef}>
                <motion.div whileHover={{ scale: 1.2 }} onClick={handleScrollLeft} className={styles.arrowWrapper}>
                    <Image
                        className={styles.arrowLeft}
                        width={!isMobile ? 24 : 20}
                        height={!isMobile ? 24 : 20}
                        src={'/static/triangle.png'}
                        alt={'left scroll arrow'}
                    />
                </motion.div>
                {videos.slice(slice).map((video, index) => (
                    <Card
                        key={index}
                        id={index}
                        imgUrl={video.imgUrl}
                        size={size}
                        onClick={() => handleCardClick(video)}
                    />
                ))}
                <motion.div whileHover={{ scale: 1.2 }} onClick={handleScrollRight} className={styles.arrowWrapper}>
                    <Image
                        className={styles.arrowRight}
                        width={!isMobile ? 24 : 20}
                        height={!isMobile ? 24 : 20}
                        src={'/static/triangle.png'}
                        alt={'left scroll arrow'}
                    />
                </motion.div>
            </div>
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
        </section>
    )
}

export default SectionCards
