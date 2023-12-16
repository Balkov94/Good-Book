import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { IQuestionAuthorHeaderProps } from './QuestionCard';

function QuestionAuthorHeader({ username, fname, lname, userPic }: IQuestionAuthorHeaderProps) {
   
   return (
      <Card sx={{
         maxWidth: 345,
         minWidth:208,
         color: "white",
         '& .MuiTypography-root.MuiTypography-body2.MuiCardHeader-title': {
            fontSize: "18px",
            fontStyle: "Bold",

         },
         '& .MuiTypography-body2.MuiCardHeader-subheader': {
            color: "white",
            opacity: "0.8"
         },
      }}>
         <CardHeader
            avatar={
               <Avatar sx={{ bgcolor: red[500] }} alt="user"
                  src={userPic} aria-label="recipe">
               </Avatar>
            }
            title={username}
            subheader={`${fname}  ${lname}`}
         />
      </Card>

   );
}

export default QuestionAuthorHeader;