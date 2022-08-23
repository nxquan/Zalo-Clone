import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './ProfileFriend.module.scss';

import Button from '@/components/Button';
import ButtonIcon from '@/components/ButtonIcon';
import Image from '@/components/Image';
import { GrClose } from 'react-icons/gr';
import { addFriendRoute } from '@/utils/APIRoute';
import axios from 'axios';

const cx = classNames.bind(styles);

const ProfileFriend = forwardRef(
	({ currentFriend, currentUserPhone, contacts, setContacts, onClose, onChangeChat }, ref) => {
		const handleAddContact = (contact) => {
			setContacts((prev) => [...prev, contact]);
		};

		const handleAddFriend = async () => {
			handleAddContact(currentFriend);
			await axios.post(addFriendRoute, {
				phoneUser: currentUserPhone,
				phoneFriend: currentFriend.phone,
			});
		};
		const isFriend = () => {
			return contacts.some((contact) => {
				return contact.phone === currentFriend.phone;
			});
		};
		return (
			<div className={cx('wrapper')} ref={ref}>
				<div className={cx('header')}>
					<h4 className={cx('header-heading')}>Thông tin tài khoản</h4>
					<ButtonIcon className={cx('header-icon')} onClick={onClose}>
						<GrClose />
					</ButtonIcon>
				</div>
				<div className={cx('body')}>
					<div className={cx('body-preview')}>
						<Image className={cx('cover-picture')} src={currentFriend.coverPicture} />
						<Image
							className={cx('profile-picture')}
							src={currentFriend.profilePicture}
						/>
						<h4>{currentFriend.username}</h4>
					</div>
					<div className={cx('body-actions')}>
						{!isFriend() && (
							<Button className={cx('body-action')} rounded onClick={handleAddFriend}>
								Kết bạn
							</Button>
						)}
						<Button
							className={cx('body-action')}
							rounded
							onClick={() => {
								onChangeChat(currentFriend);
								onClose();
							}}
						>
							Nhắn tin
						</Button>
					</div>
					<div className={cx('body-infor')}>
						<h5>Thông tin cá nhân</h5>
						<div className={cx('body-detail')}>
							<span className={cx('body-name')}>Bio</span>
							<span className={cx('body-value')}>Online</span>
						</div>
						<div className={cx('body-detail')}>
							<span className={cx('body-name')}>Điện thoại</span>
							<span className={cx('body-value')}>
								+84{currentFriend.phone.substr(1)}
							</span>
						</div>
						<div className={cx('body-detail')}>
							<span className={cx('body-name')}>Giới tính</span>
							<span className={cx('body-value')}>
								{currentFriend.gender ? 'Nam' : 'Nữ'}{' '}
							</span>
						</div>
						<div className={cx('body-detail')}>
							<span className={cx('body-name')}>Ngày sinh</span>
							<span className={cx('body-value')}>
								{currentFriend.birthday.day} tháng {currentFriend.birthday.month},{' '}
								{currentFriend.birthday.year}{' '}
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
);

export default ProfileFriend;
