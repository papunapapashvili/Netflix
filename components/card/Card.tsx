'use client'
import { FC, useState } from 'react'
import Image from 'next/image'
import styles from './Card.module.css'

import cls from 'classnames'
import { motion } from 'framer-motion'

type Size = 'large' | 'medium' | 'small'

interface Props {
    id: number
    imgUrl: string
    size: Size
    onClick: () => void
}

const Card: FC<Props> = ({ imgUrl, size, onClick }) => {
    const [imageError, setImageError] = useState(false)

    const classMap = {
        large: styles.lgItem,
        medium: styles.mdItem,
        small: styles.smItem,
    }

    const fallbackImgUrl = '/static/error-image.png'

    const handleImageError = () => {
        setImageError(true)
    }

    return (
        <div onClick={onClick} className={styles.wrapper}>
            <motion.div whileHover={{ scale: 1.1 }} className={cls(styles.imgMotionWrapper, classMap[size])}>
            {imageError ? (
                    <Image
                        className={styles.cardImg}
                        src={fallbackImgUrl}
                        alt={'Fallback Image'}
                        layout='fill'
                        sizes="(min-width: 218px)"
                    />
                ) : (
                    <Image
                        className={styles.cardImg}
                        src={imgUrl}
                        alt={'Image'}
                        layout='fill'
                        onError={handleImageError}
                        sizes="(min-width: 218px)"
                    />
                )}
            </motion.div>
        </div>
    )
}

export default Card
