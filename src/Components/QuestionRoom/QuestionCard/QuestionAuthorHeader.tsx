
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IQuestionAuthorHeaderProps } from './QuestionCard';

function QuestionAuthorHeader({username,fname,lname,picture}:IQuestionAuthorHeaderProps) {

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
            {picture?picture:"R"}
          </Avatar>
        }
      //   action={
      //     <IconButton aria-label="settings">
      //       <MoreVertIcon />
      //     </IconButton>
      //   }
        title={username}
        subheader={`${fname}  ${lname}`}
      />
      </Card>
     
   );
}

export default QuestionAuthorHeader;