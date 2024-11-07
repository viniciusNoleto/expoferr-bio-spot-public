
import { useComplaintRepository } from '~/app/complaint/repositories/complaintRepository';

export const useGetComplaintService = defineService(() => {

  const { getComplaint } = useComplaintRepository();

  return {
    getComplaintService: getComplaint
  };

});
