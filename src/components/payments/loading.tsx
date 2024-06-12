import * as React from 'react';

import Grid from '@mui/material/Grid';
import { CircularProgress, Stack } from '@mui/material';

export default function Loading(): JSX.Element {
    return (
      <Grid item xs={12} zeroMinWidth>
        <Stack direction='row' justifyContent="center"
          spacing={1}
          sx={{ my: 5 }}
        >
          <CircularProgress size="2rem"
            style={{ 'color': 'white' }}
          />
        </Stack>
      </Grid>
    )
  }