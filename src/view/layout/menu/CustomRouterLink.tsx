import { Link } from 'react-router-dom';

const CustomRouterLink = (props) => {
     return (
        <div
          style={{
          flexGrow: 1,
        }}
      >
        <Link
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
          {...props}
        />
      </div>
    )
  };

export default CustomRouterLink;
