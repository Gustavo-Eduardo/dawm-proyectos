import { Paper } from '@mui/material';
import { withStyles } from "@mui/styles"

import Header from '../Header';

const CustomPaper = withStyles({
  root: {
    width: '100vw',
    height: '100vh',
    backgroundColor: "#ead3d7 !important",
    margin: 0,
  },
})(Paper);

function PageWrapper({ children }) {

  return (
    <div>
      <CustomPaper>
        <Header />
        {children}
      </CustomPaper>
    </div>
  );
}

export default PageWrapper;
