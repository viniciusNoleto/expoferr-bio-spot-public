
import { useComplaintRepository } from '~/app/complaint/repositories/complaintRepository';

export const useGetComplaintsService = defineService(() => {

  const { getComplaints } = useComplaintRepository();

  return {
    getComplaintsService: getComplaints
  };

});
