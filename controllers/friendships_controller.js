import User from '../models/user.js';
import Friendship from '../models/friendship.js';


let toggle = async function (req, res) {

    try {

        let existingFriendship1 = await Friendship.findOne({
            from_user: req.query.from_user,
            to_user: req.query.to_user
        });
        let existingFriendship2 = await Friendship.findOne({
            from_user: req.query.to_user,
            to_user: req.query.from_user
        });

        let existingFriendship=existingFriendship1||existingFriendship2;


        if (existingFriendship) {
            await User.findByIdAndUpdate(req.query.from_user, { $pull: { friendships: existingFriendship._id } });
            await User.findByIdAndUpdate(req.query.to_user, { $pull: { friendships: existingFriendship._id} });

            await Friendship.findByIdAndDelete(existingFriendship._id);

            req.flash('success','Friend Removed');
        }
        else {
            let newFriendship = await Friendship.create({
                from_user: req.query.from_user,
                to_user: req.query.to_user
            });
            await User.findByIdAndUpdate(req.query.from_user, { $push: { friendships: newFriendship._id } });
            await User.findByIdAndUpdate(req.query.to_user, { $push: { friendships: newFriendship._id } });

            req.flash('success','Friend Added');
        }
    } catch (err) {
        console.log('Error in creating/deleting friendship' ,err);
    }

    return res.redirect('back');

}

let friendshipController={toggle};
export default friendshipController;