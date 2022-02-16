import {useState} from "react"
import {Link, useHistory} from 'react-router-dom'
import {gql,useMutation} from '@apollo/client';
import { ADD_SONG } from "../queries";
const SongCreate = () =>
{
  const history=useHistory();
    const [songTitle, setSongTitle] = useState('');
  const [addSong,{data,loading,error}]=useMutation(ADD_SONG,{
    // refetchQueries: [
    //   { query: GET_SONGS }
    // ]
    update(cache,{data: {addSong}}) {
      cache.modify({
        fields: {
          songs(existingSongs) {
            const newSongRef=cache.writeFragment({
              data: addSong,
              fragment: gql`fragment NewSong on Song {
                                            id
                                            title
                                        } `
            });
            return [...existingSongs,newSongRef];
          }
        }
      });
    }
  });
    const handleSubmit = (e) =>
    {
         e.preventDefault();
      addSong({variables: {title: songTitle}})?.then(() => {
            history.push('/')
        setSongTitle('');
          });
    }

  return (<div>
      <Link to='/'>Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={handleSubmit}>
            <label>Song Title :</label>
            <input type='text' onChange={(e) => setSongTitle(e.target.value)} value={songTitle}  required/>
            {/* <button type='submit' disabled={!!! songTitle}>Save</button> */}
      </form>
      {!!data && !loading && error===undefined ?'Data save successfully':null}
    </div>)
}
 
export default SongCreate