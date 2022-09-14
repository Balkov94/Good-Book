
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function QuestionAuthorHeader() {
   return (  
      <Card sx={{ 
         maxWidth: 345,
         color:"white",
         '& .MuiTypography-root.MuiTypography-body2.MuiCardHeader-title':{
            fontSize:"18px",
            fontStyle:"Bold",

         },
         '& .MuiTypography-body2.MuiCardHeader-subheader':{
            color:"white",
            opacity:"0.8"
         },
      }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
      //   action={
      //     <IconButton aria-label="settings">
      //       <MoreVertIcon />
      //     </IconButton>
      //   }
        title="User username"
        subheader="User firstName lastName"
      />
      </Card>
     
   );
}

export default QuestionAuthorHeader;