import moment from 'moment';
import { toastr } from 'react-redux-toastr';

export const updateProfile = (user) => 
    async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const {isLoaded, isEmpty, ...updatedUser} = user;
        if (updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
            updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate(); 
        }

        try {
            await firebase.updateProfile(updatedUser);
            toastr.success('Success', 'Profile Updated')
        } catch (err) {
            console.log(err)
        }
    }


export const uploadProfileImage = (file, fileName) => 
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const path = `${user.uid}/user_images`;
        const options = {
            name: fileName
        }
        try {
            //upload file to firebase storage
            let uploadedFile = await firebase.uploadFile(path, file, null, options);
            let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;
            let userDoc = await firestore.get(`users/${user.uid}`);
            //get url of image
            //get userdoc 
            //check if user has photo, if not update profile with new image
            //add the new photo to photos collection
        } catch(err) {
            console.log('err', err)
        }

    }