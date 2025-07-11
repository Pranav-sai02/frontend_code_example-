// src/hooks/useHotels.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Hotel } from '../type/Hotel';

import { updateHotel, fetchAllHotels, saveHotel } from '../api/hotel';


// React Query for fetching
export const useHotels = () => {
  return useQuery<Hotel[]>({
    queryKey: ['hotels'],
    queryFn: fetchAllHotels,

  });

};

// React Query for saving
export const useSaveHotel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saveHotel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotels'] }); // refetch
    },
    onError: (error) => {
      console.error('Save failed:', error);
    }
  });
};

// React Query for updating
export const useUpdateHotel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateHotel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
    },
  });
};

// React Query for deleting
// export const useDeleteHotel = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: deleteHotel,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['hotels'] });
//     },
//   });
// };
