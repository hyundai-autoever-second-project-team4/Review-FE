import React from "react";
import CustomModal from "../../../components/CustomModal/CustomModal";

function EditProfileModal({ modal, modalClose }) {
  return (
    <CustomModal title="프로필 편집" modal={modal} modalClose={modalClose}>
      BadgeModal
    </CustomModal>
  );
}

export default EditProfileModal;
