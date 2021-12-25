import {useState,useEffect} from 'react';
import {
  gql, useMutation
} from '@apollo/client'
import LyricListItem from './LyricListItem';
import {FETCH_SONG, LIKE_LYRIC} from '../queries'

const LyricList = ({datas,id}) =>
{
    const [lyrics, setLyrics] = useState([]);

    const [likeLyric]=useMutation(LIKE_LYRIC
        // ,{
        //     refetchQueries: [{query: FETCH_SONG, variables: {id}}],
        // update(cache, { data: { likeLyric } }) {
        //     cache.modify({
        //         fields: {
        //             songs(existingLyrics) {
        //                 const newLyricRef=cache.writeFragment({
        //                     data: likeLyric,
        //                     fragment: gql`fragment Lyric on Lyrics {
        //                                     id
        //                                     title
        //                                 } `
        //                 });
        //                 return [...existingLyrics,newLyricRef];
        //         }
        //     }})
        // }
        // }
    )
    const handleLike=(id,likes) => {
        likeLyric({
            variables: {id},
            optimisticResponse: {
                __typeName: "Mutation",
                likeLyric:{
                    __typeName: 'LyricType',
                    id:id,
                    likes: likes + 1
                }
        }})?.then(() => {
            
        })
    };
    const renderLyrics = () => {
        return <ul className='collection'>
            { lyrics?.map(({content, id,likes}) =>
                <LyricListItem key={id} content={content} likes={likes} id={id} handleLike={handleLike}/>
        )}
        {datas?.length!== lyrics?.length?'Loading...':''} 
   </ul>
}
    useEffect(() => {
        // if (lyrics?.length===0 || datas?.length!== lyrics?.length)
        // {
            setLyrics(datas)
        // }
    }, [lyrics,datas])
  
    return (
        <>
            {lyrics?.length>0?
            renderLyrics():<h3>No lyrics founds, please add some lyrics</h3>}
        </>
        )
}
      

export default LyricList