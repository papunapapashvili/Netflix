import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'

import styles from './home.module.css'
import Banner from '../components/banner/Banner'
import NavBar from '../components/navBar/NavBar'
import SectionCards from '../components/sectionCards/SectionCards'

import { getDisneyVideos, getDisneyTrailers } from '@/lib/organizedData'

export default function Home() {
    const disneyVideos = getDisneyVideos()
    const trailers = getDisneyTrailers()
    const router = useRouter()
    const { name } = router.query
    const [storedUsername, setStoredUsername] = useState('')
    const status = name || storedUsername ? 'Sign Out' : 'Sign In'

    const handleLocation = () => {
        if (name) {
            router.push('/')
            localStorage.clear()
        } else if (storedUsername) {
            window.location.reload()
            localStorage.clear()
            router.push('/')
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

    return (
        <main className={styles.main}>
            <Head>
                <title>Netflix</title>
            </Head>
            <NavBar
                userName={name || storedUsername || 'UserName'}
                RegistrationStatus={status}
                location={handleLocation}
                transferUserName={name}
            />
            <Banner videos={disneyVideos} />
            <div className={styles.sectionWrapper}>
                <SectionCards title={'Disney'} videos={disneyVideos} size={'large'} slice={1} />
                <SectionCards title={'Trailers'} videos={trailers} size={'small'} slice={0} />
                <SectionCards title={'Popular'} videos={disneyVideos} size={'medium'} slice={1} />
            </div>
        </main>
    )
}
