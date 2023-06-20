import { Box, Button, Typography } from '@mui/material'
import { ThemeProvider } from "@mui/material";
import { LightTheme } from "@/theme/theme";
import styles from './index.less';
import axios from 'axios';
import EthPage from './eth';

export default function IndexPage() {
  // axios.get(`https://unisat.io/brc20-api-v2/inscriptions/category/text/search/v2?name=551166&limit=32&start=0`).then((res) => {
  //   console.log('---res---', res)
  // })
  return (
    <ThemeProvider theme={LightTheme}>
      <EthPage />
      {/* <Box sx={{ p: '20px' }}>
        <Typography>Current Inscription</Typography>
        <Box sx={{ 
          display: 'flex',
          columnGap: '10px',
          '.item': {
          },
          img: {
            width: 100,
            height: 100,
            objectFit: 'cover',
          }
        }}>
          {[
            {uri: 'https://ordinals.com/content/55b177aba3d0af1e62831ad560efd8e5ef159b4f926da1c52fd0d582740118adi0'},
            {uri: 'https://ordinals.com/content/c4c0a6310985ae491e3e1158ef2feaa7cf94becfc60eb1d4b08dec91ddfceb2bi0'},
          ].map(({uri}) => <Box key={uri} className="item">
            <img src={uri}  />
          </Box>)}
        </Box>
        <hr />
        <Box>
          <Button variant='contained'>Now Inscribed</Button>
        </Box>
      </Box> */}
  </ThemeProvider>
  );
}
