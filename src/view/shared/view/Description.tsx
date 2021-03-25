import styled from 'styled-components';
import Link from '@material-ui/core/Link';

const ConfigDescription = styled.p`
  width:150px;
  max-height:50px;
  overflow: hidden;
  margin: 0px;
`
const spacesRemover = description => {
  let newDescription = description
    .split(" ")
    .filter((text) => text.length)
    .join(" ");
  
  return newDescription;
};

const limitString = (string, limit) => { 
  if(string.length <= limit){
    return string
  }

  return string.slice(0,limit - string.length);
}

const Description = ({ description , setDescription }) => {
  const limit = 40;
  const saveDescription = () => (
    setDescription(description)
  );

  const newDescription = spacesRemover(description);
  const activeViewModal = newDescription.length > limit; 
  
 
  return( 
    <ConfigDescription>
      {limitString(newDescription,limit)}
        {activeViewModal && '...'}
      {activeViewModal && <Link onClick = {saveDescription} >Ver mas</Link>}
    </ConfigDescription>
  );
}


export default Description;
