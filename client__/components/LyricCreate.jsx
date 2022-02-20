import {useState} from "react"
import {gql,useMutation} from '@apollo/client';
import LoadingSpinner from "./reusable/LoadingSpinner";
import { ADD_LYRIC_TO_SONG, FETCH_SONG } from "../queries";
const LyricCreate = ({songId}) =>
{
    const [songLyric, setSongLyric] = useState('');
    const [addLyricToSong,{data,loading,error}]=useMutation(ADD_LYRIC_TO_SONG
        ,{
    // refetchQueries: [
    //   { query: FETCH_SONG }
    // ]
    update(cache,{data: {addLyricToSong}}) {
      cache.modify({
        fields: {
          songs(existingLyrics) {
            const newLyricRef=cache.writeFragment({
              data: addLyricToSong,
              fragment: gql`fragment NewLyric on Lyric {
                                            id
                                            content
                                        } `
            });
            return [...existingLyrics,newLyricRef];
          }
        }
      });
    }
  }
  );
    const handleSubmit = (e) =>
    {
         e.preventDefault();
      addLyricToSong({variables: {content: songLyric, songId}})?.then(() => {
       setSongLyric('');
          });
    };
//     if(loading) return <LoadingSpinner />;
//   if (error) return `Error! ${error.message}`;

  return (<div>
        <h4>Add a Lyric</h4>
        <form onSubmit={handleSubmit}>
            <label>Lyric Title :</label>
            <input type='text' onChange={(e) => setSongLyric(e.target.value)} value={songLyric}  required/>
            {/* <button type='submit' disabled={!!! songTitle}>Save</button> */}
      </form>
      {/* {!!data && !loading && error===undefined ?'Data save successfully':null} */}
    </div>)
}
 
export default LyricCreate