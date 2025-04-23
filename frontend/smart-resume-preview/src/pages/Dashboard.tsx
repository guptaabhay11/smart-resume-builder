import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardActionArea, 
  CardContent, 
  useTheme,
  Paper,
  Container,
  Divider 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/PostAdd';
import ListIcon from '@mui/icons-material/Article';

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Blue color palette
  const primaryBlue = '#1e4976'; // Dark blue for header
  const secondaryBlue = '#e8f0f8'; // Light blue for icon backgrounds
  const accentBlue = '#4285f4'; // Accent blue for hover effects
  
  const options = [
    {
      title: 'Create Resume',
      description: 'Start building a new professional resume from scratch.',
      icon: <CreateIcon sx={{ fontSize: 40, color: primaryBlue }} />,
      onClick: () => navigate('/select-template'),
    },
    {
      title: 'My Resumes',
      description: 'View and download resumes you\'ve created.',
      icon: <ListIcon sx={{ fontSize: 40, color: primaryBlue }} />,
      onClick: () => navigate('/my-resumes'),
    },
  ];
  
  return (
    <Container maxWidth="md">
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          mt: 4,
          mb: 6,
          backgroundColor: 'white',
          border: '1px solid #e0e0e0'
        }}
      >
        <Box
          p={4}
          pb={2}
          sx={{
            background: `linear-gradient(135deg, ${primaryBlue} 0%, #3a6ea5 100%)`,
            borderRadius: '16px 16px 0 0',
          }}
        >
          <Typography variant="h4" fontWeight="bold" color="white">
            Resume Builder Dashboard
          </Typography>
          <Typography variant="subtitle1" color="white" sx={{ opacity: 0.9, mt: 1 }}>
            Build professional resumes with our easy-to-use tools
          </Typography>
        </Box>
        
        <Box sx={{ p: 3 }}>
          {options.map((option, idx) => (
            <Card
              key={idx}
              elevation={2}
              sx={{
                mb: 3,
                borderRadius: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                  '& .icon-container': {
                    backgroundColor: '#d5e5f6',
                  }
                }
              }}
            >
              <CardActionArea onClick={option.onClick} sx={{ p: 1 }}>
                <CardContent sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  p: 3
                }}>
                  <Box
                    className="icon-container"
                    sx={{
                      backgroundColor: secondaryBlue,
                      borderRadius: '50%',
                      width: 64,
                      height: 64,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    {option.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight="500" color={primaryBlue}>
                      {option.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
                      {option.description}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
        
        <Divider />
        
        <Box p={3} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Choose an option above to get started with your resume
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;