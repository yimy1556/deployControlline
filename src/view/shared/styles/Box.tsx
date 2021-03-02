import { styled } from '@material-ui/core/styles';

const Box = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    flex: '1',
    margin: '0 0.4em',
    height: '100%',
    backgroundColor: 'rgb(250,250,250)',
    fontSize: '2em',
    backgroundSize: 'cover',
    boxShadow: '0 0 5px rgba(30,30,30,0.3)',
    cursor: 'pointer'
});

export default Box;
