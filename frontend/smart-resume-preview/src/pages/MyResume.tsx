import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Divider,
  Container,
  Paper,
  useTheme,
  Tooltip,
  IconButton,
  alpha
} from '@mui/material';
import { useMeQuery } from '../services/api'; // adjust the import if needed
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const MyResume = () => {
  const { data, isLoading, isError } = useMeQuery();
  const theme = useTheme();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh" flexDirection="column">
        <CircularProgress size={60} thickness={4} />
        <Typography mt={3} variant="body1" color="text.secondary">
          Loading your resumes...
        </Typography>
      </Box>
    );
  }

  if (isError || !data?.data) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="70vh"
        flexDirection="column"
      >
        <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
        <Typography color="error" variant="h6">
          Failed to load resumes
        </Typography>
        <Typography color="text.secondary" mt={1}>
          Please check your connection and try again
        </Typography>
      </Box>
    );
  }

  const pdfs = data.data.pdf || [];

  const truncateUrl = (url: string) => {
    if (url.length > 60) {
      return url.substring(0, 30) + '...' + url.substring(url.length - 30);
    }
    return url;
  };

  const getFileName = (url: string, index: number) => {
    try {
      const pathParts = new URL(url).pathname.split('/');
      const fileName = pathParts[pathParts.length - 1];
      return fileName || `Resume ${index + 1}`;
    } catch {
      return 'Resume';
    }
  };

  return (
    <Container maxWidth="md">
      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 2, 
          overflow: 'hidden',
          mt: 4,
          mb: 6
        }}
      >
        <Box 
          p={4} 
          pb={2}
          sx={{
            backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
            borderRadius: '16px 16px 0 0',
          }}
        >
          <Typography variant="h4" fontWeight="bold" color="white">
            My Resumes
          </Typography>
          <Typography variant="subtitle1" color="white" sx={{ opacity: 0.9, mt: 1 }}>
            View and download your saved resume documents
          </Typography>
        </Box>

        <Box p={3}>
          {pdfs.length === 0 ? (
            <Box 
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 6,
                backgroundColor: alpha(theme.palette.primary.light, 0.05),
                borderRadius: 2
              }}
            >
              <InsertDriveFileIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2, opacity: 0.6 }} />
              <Typography variant="h6" color="text.secondary">
                No resumes saved yet
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                Create your first resume to see it here
              </Typography>
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" gap={3}>
              {pdfs.map((url, index) => {
                const fileName = getFileName(url, index);
                
                return (
                  <Card 
                    key={index} 
                    elevation={2}
                    sx={{ 
                      borderRadius: 2,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: theme.shadows[6],
                      }
                    }}
                  >
                    <CardContent>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box 
                          sx={{ 
                            backgroundColor: alpha(theme.palette.primary.main, 0.1), 
                            borderRadius: '50%',
                            width: 48,
                            height: 48,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <PictureAsPdfIcon sx={{ color: theme.palette.primary.main }} />
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" fontWeight="500">
                            {fileName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Resume {index + 1}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Tooltip title={url}>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{
                            fontSize: 13,
                            fontFamily: 'monospace',
                            backgroundColor: alpha(theme.palette.grey[300], 0.3),
                            p: 1,
                            borderRadius: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {truncateUrl(url)}
                        </Typography>
                      </Tooltip>
                    </CardContent>
                    
                    <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                      <Button
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        color="primary"
                        size="medium"
                        startIcon={<VisibilityIcon />}
                        sx={{ mr: 1, borderRadius: 1.5 }}
                      >
                        View
                      </Button>
                      <Button
                        href={url}
                        download
                        variant="contained"
                        color="primary"
                        size="medium"
                        startIcon={<DownloadIcon />}
                        sx={{ borderRadius: 1.5 }}
                      >
                        Download
                      </Button>
                    </CardActions>
                  </Card>
                );
              })}
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default MyResume;