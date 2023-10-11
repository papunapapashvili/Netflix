'use client'
import { FC, useEffect, useState } from 'react'
import styles from './NavBar.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface Props {
    userName: any
    RegistrationStatus: string
    location: () => void
    transferUserName?: any
}

const NavBar: FC<Props> = ({ userName, RegistrationStatus, location, transferUserName }) => {
    const router = useRouter()
    const currentPage = router.pathname
    const [isMobile, setIsMobile] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const handleHomeClick = () => {
        if (currentPage == '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setIsOpen(false)
        } else router.push('/')
    }

    const handleListClick = () => {
        router.push({
            pathname: '/MyList',
            query: { transferUserName }
        })
    }

    const handleDropDown = () => {
        setShowDropdown(!showDropdown)
    }

    const toggleDrawer = () => {
        setIsOpen(!isOpen)
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

    return (
        <div className={`${styles.wrapper} ${isOpen ? styles.blurryWrapper : ''}`}>
            {!isMobile ? (
                <div className={styles.logo}>
                    <div className={styles.logoLink} onClick={handleHomeClick}>
                        <div className={styles.logoWrapper}>
                            <Image
                                width={150}
                                height={75}
                                src='/static/netflix.svg'
                                alt='Netflix logo'
                            />
                        </div>
                    </div>

                    <ul className={styles.navItems}>
                        <li onClick={handleHomeClick} className={styles.navItem}>
                            Home
                        </li>
                        <li onClick={handleListClick} className={styles.navItem2}>
                            My List
                        </li>
                    </ul>
                    <nav className={styles.navContainer}>
                        <div>
                            <button onClick={handleDropDown} className={styles.usernameBtn}>
                                <p className={styles.username}>{userName}</p>
                                <Image
                                    className={styles.dropDownIcon}
                                    width={14}
                                    height={12}
                                    src={'/static/arrow-down.png'}
                                    alt={'Expand more icon'}
                                />
                            </button>

                            {showDropdown && (
                                <div className={styles.navDropdown}>
                                    <div>
                                        <div onClick={location}>
                                            <span className={styles.linkName}>{RegistrationStatus}</span>
                                        </div>
                                        <div className={styles.lineWrapper}></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            ) : (
                <div className={styles.logo}>
                    <div className={styles.logoLink} onClick={handleHomeClick}>
                        <div className={styles.logoWrapper}>
                            <Image
                                width={150}
                                height={75}
                                src='/static/netflix.svg'
                                alt='Netflix logo'
                                sizes='(min-width: 150px)'
                            />
                        </div>
                    </div>
                    <nav className={styles.navContainer}>
                        <div>
                            <button className={styles.drawerBtn} onClick={toggleDrawer}>
                                <Image width={24} height={24} src={'/static/menu-icon.png'} alt={''} />
                            </button>

                            <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
                                <div className={styles.drawerContentWrapper}>
                                    <button className={styles.drawerBtn} onClick={toggleDrawer}>
                                        <Image width={16} height={16} src={'/static/close.png'} alt={'close icon'} />
                                    </button>
                                    <div className={styles.drawerContent}>
                                        <span onClick={handleHomeClick} className={styles.navItem}>
                                            Home
                                        </span>
                                        <span onClick={handleListClick} className={styles.navItem2}>
                                            My List
                                        </span>
                                        <div className={styles.navItem3}>
                                            <div className={styles.drawerUsername}>
                                                <Image
                                                    width={15}
                                                    height={15}
                                                    src={'/static/user.png'}
                                                    alt={'User icon'}
                                                />
                                                {userName}
                                            </div>
                                            <div onClick={location}>{RegistrationStatus}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            )}
        </div>
    )
}
export default NavBar
