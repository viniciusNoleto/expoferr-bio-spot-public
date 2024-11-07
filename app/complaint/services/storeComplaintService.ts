
import { useComplaintRepository } from '~/app/complaint/repositories/complaintRepository';

export const useStoreComplaintService = defineService(() => {

  const { storeComplaint } = useComplaintRepository();

  return {
    storeComplaintService: storeComplaint
  };

});
