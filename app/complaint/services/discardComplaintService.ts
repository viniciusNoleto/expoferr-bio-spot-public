
import { useComplaintRepository } from '~/app/complaint/repositories/complaintRepository';

export const useDiscardComplaintService = defineService(() => {

  const { discardComplaint } = useComplaintRepository();

  return {
    discardComplaintService: discardComplaint
  };

});
