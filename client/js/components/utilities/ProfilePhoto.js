import React from 'react';
import { string, number } from 'prop-types';
import MaleDefaultAvatar from './MaleDefaultAvatar';
import FemaleDefaultAvatar from './FemaleDefaultAvatar';

function ProfilePhoto({ imageClassName, imagePath, gender, avatarSize }) {
    if (!imagePath && gender === 'Male') {
        return <MaleDefaultAvatar size={avatarSize} />;
    }

    if (!imagePath && gender === 'Female') {
        return <FemaleDefaultAvatar size={avatarSize} />;
    }

    return <img className={imageClassName} src={imagePath} alt='Avatar' />;
}

ProfilePhoto.propTypes = {
    imageClassName: string,
    imagePath: string,
    gender: string.isRequired,
    avatarSize: number,
};

export default ProfilePhoto;
