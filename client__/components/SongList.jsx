import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import {
  gql,useQuery, useMutation
} from '@apollo/client'
import LoadingSpinner from './reusable/LoadingSpinner'
import SongListItem from './SongListItem';
import {GET_SONGS, DELETE_SONG} from '../queries'

const SongList = () =>
{
    const [songs, setSongs] = useState([]);

    const {loading,error,data , refetch}=useQuery(GET_SONGS);
    const [deleteSong]=useMutation(DELETE_SONG
        // ,{
        // update(cache, { data: { deleteSong } }) {
        //     cache.modify({
        //         fields: {
        //             songs(existingSongs) {
        //                 const newSongsRef=cache.writeFragment({
        //                     data: deleteSong,
        //                     fragment: gql`fragment NewSong on Song {
        //                                     id
        //                                     title
        //                                 } `
        //                 });
        //                 return [...existingSongs,newSongsRef];
        //         }
        //     }})
        // }
        // }
    )
    const handleDelete=(id) => {
        deleteSong({variables: {id: id}})?.then(() => {
            
            refetch();
        })
        // deleteSong({variables:{id}})
    }
    const renderSongs = () => {
        return <ul className='collection'>
            { songs?.map(({title, id}) =>
                <SongListItem key={id} title={title} id={id} handleDelete={handleDelete}/>
        )}
   </ul>
}
    useEffect(() => {
        if (!loading && error===undefined)
        {
            setSongs(data?.songs)
        }
    }, [loading, data])
    if (loading) return <LoadingSpinner/>;
  if (error) return `Error! ${error.message}`;
    return (
        <>
            {/* <LoadingSpinner /> */}
            {songs?.length>0?
            renderSongs():<h3>No Songs founds, please add song</h3>}
            <Link
                className="btn-floating btn-large waves-effect waves-light red right"
                to='/songs/new'
            >
                <i className="material-icons">add</i>
            </Link>
        </>
        )
}
      

export default SongList