'use client'
import Head from 'next/head'
import Image from 'next/image'
import styles from './SignUp.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'

import Link from 'next/link'

const SignUpPage = () => {
    const router = useRouter()
    const [userMsg, setUserMsg] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    const handleOnEmailChange = (e: any) => {
        setUserMsg('')
        const email = e.target.value
        setEmail(email)
        console.log('email:', email.length)
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
            const validName = trimmedName.length >= 6

            if (validEmail && validName) {
                localStorage.setItem('username', trimmedName)
                router.push('/')
            } else if (!validName) {
                setUserMsg('Name should contain at least 6 letters')
            } else {
                setUserMsg('Enter a valid info')
            }
        }
    }

    const handleSignUp = () => {
        const trimmedEmail = email.trim()
        const trimmedName = name.trim()

        const validEmail = trimmedEmail.endsWith('@gmail.com')
        const validName = trimmedName.length >= 6

        if (validEmail && validName) {
            localStorage.setItem('username', trimmedName)
            router.push('/')
        } else if (!validName) {
            setUserMsg('Name should contain 6 or more letters')
        } else if (!validEmail) {
            setUserMsg('Email might have a typo')
        }
    }

    const handlePageRefresh = () => {
        window.location.reload()
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Netflix Sign Up</title>
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
                    <h1 className={styles.signInHeader}>Sign Up</h1>

                    <div onKeyDown={handleEnterKey} className={styles.inputWrapper}>
                        <span>Sign Up with a temporary account</span>
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
                    <button onClick={handleSignUp} className={styles.loginBtn}>
                        Sign Up
                    </button>
                    <span className={styles.singUpWrapper}>
                        Already have an account?{' '}
                        <Link style={{ textDecoration: 'underline' }} href={'/SignIn'}>
                            Sign In
                        </Link>
                    </span>
                </div>
            </main>
        </div>
    )
}

export default SignUpPage
