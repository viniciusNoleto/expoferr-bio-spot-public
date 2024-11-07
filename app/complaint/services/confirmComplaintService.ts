
import { useComplaintRepository } from '~/app/complaint/repositories/complaintRepository';

export const useConfirmComplaintService = defineService(() => {

  const { confirmComplaint } = useComplaintRepository();

  return {
    confirmComplaintService: confirmComplaint
  };

});
