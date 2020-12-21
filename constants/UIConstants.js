export const Role = {
  Admin: 0,
  Doctor: 1,
  Technician: 2,
};
export const UserVerificationStatus = {
  Pending: 0,
  Approved: 1,
  Rejected: 2,
};

export const getUserVerificationLabel = (status) => {
  switch (status) {
    case UserVerificationStatus.Pending:
      return 'Pending';
    case UserVerificationStatus.Approved:
      return 'Approved';
    case UserVerificationStatus.Rejected:
      return 'Rejected';
  }
};
export const isSuccessDefault = (value) => {};
