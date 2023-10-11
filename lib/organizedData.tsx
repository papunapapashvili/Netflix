import DisneyTrailers from '../data/disneyTrailers.json'
import disneyVideos from '../data/disney.json'
import userInfo from '../data/users.json'

export const getDisneyVideos = () => {
    return (
        disneyVideos.items.map((item) => {
            return {
                title: item?.snippet.title,
                subTitle: item?.snippet.subtitle,
                imgUrl: item?.snippet.thumbnails.high.url,
                id: item?.id.videoId,
                publishTime: item?.snippet.publishTime,
                description: item?.snippet.description,
                videoId: item?.id.videoId,
            }
        })
    )
}

export const getDisneyTrailers = () => {
    return DisneyTrailers.items.map((item) => {
        return {
            title: item?.snippet.title,
            imgUrl: item?.snippet.thumbnails.high.url,
            id: item?.id.videoId,
            publishTime: item?.snippet.publishTime,
            description: item?.snippet.description,
            videoId: item?.id.videoId,
        }
    })
}

export const getUserInfo = () => {
    return userInfo.users.map((item) => {
        return {
            name: item?.username,
            email: item?.email,
        }
    })
}

// export const getLikedVideos = () => {
//     return 
// }