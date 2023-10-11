'use client'
import Head from 'next/head'
import Image from 'next/image'
import styles from './SignIn.module.css'
import { useState } from 'react'
import { getUserInfo } from '@/lib/organizedData'
import { useRouter } from 'next/router'
import Link from 'next/link'

const SignInPage = () => {
    const router = useRouter()
    const userInfo = getUserInfo()

    const [userMsg, setUserMsg] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    const handleOnEmailChange = (e: any) => {
        setUserMsg('')
        const email = e.target.value
        setEmail(email)
    }

    const handleOnNameChange = (e: any) => {
        setUserMsg('')
        const name = e.target.value
        setName(name)
    }

    const handleEnterKey = (e: any) => {
        if (e.key === 'Enter') {
            const trimmedEmail = email.trim()
            const trimmedName = name.trim()

            const validEmail = trimmedEmail.endsWith('@gmail.com')
            if (validEmail) {
                const foundUser = userInfo.find((user) => user.email === trimmedEmail && user.name === trimmedName)
                if (foundUser) {
                    setName(trimmedName)
                    router.push({
                        pathname: '/',
                        query: { name },
                    })
                } else {
                    setUserMsg('User not found')
                }
            } else {
                setUserMsg('Enter a valid info')
            }
        }
    }

    const handleLogin = () => {
        const trimmedEmail = email.trim()
        const trimmedName = name.trim()

        const validEmail = trimmedEmail.endsWith('@gmail.com')
        if (validEmail) {
            const foundUser = userInfo.find((user) => user.email === trimmedEmail && user.name === trimmedName)
            if (foundUser) {
                setName(trimmedName)
                router.push({
                    pathname: '/',
                    query: { name },
                })
            } else {
                setUserMsg('User not found')
            }
        } else {
            setUserMsg('Enter a valid info')
        }
    }

    const handlePageRefresh = () => {
        window.location.reload()
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Netflix Sign In</title>
            </Head>

            <header className={styles.header}>
                <div className={styles.headerWrapper}>
                    <div className={styles.logoLink}>
                        <div className={styles.logoWrapper}>
                            <Image
                                width={150}
                                height={75}
                                src='/static/netflix.svg'
                                alt='Netflix logo'
                                sizes='(min-width: 150px)'
                                onClick={handlePageRefresh}
                            />
                        </div>
                    </div>
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.mainWrapper}>
                    <h1 className={styles.signInHeader}>Sign In</h1>

                    <div onKeyDown={handleEnterKey} className={styles.inputWrapper}>
                        <input
                            type='text'
                            placeholder='Username'
                            className={styles.input}
                            onChange={handleOnNameChange}
                        />
                        <input
                            type='text'
                            placeholder='Email address'
                            className={styles.input}
                            onChange={handleOnEmailChange}
                        />
                    </div>

                    <p className={styles.userMsg}>{userMsg}</p>
                    <button onClick={handleLogin} className={styles.loginBtn}>
                        Sign In
                    </button>
                    <span className={styles.singUpWrapper}>
                        Don't have an account?{' '}
                        <Link style={{ textDecoration: 'underline' }} href={'/SignUp'}>
                            Sign Up
                        </Link>
                    </span>
                </div>
            </main>
        </div>
    )
}

export default SignInPage
