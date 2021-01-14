import React, { useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../header/HeaderButton';
import { isAndroid } from '../../helpers/Utils';
import { Fragment } from 'react';
import { ThemeColors } from '../../constants/Colors';
const MaterialMenu = ({ data, onItemClick, color='black', iconSize=24 }) => {
  const menuRef = useRef();
  const showMenu = () => menuRef.current.show();
  const hideMenu = () => menuRef.current.hide();
  const itemClicked = (id) => {
    onItemClick(id);
    hideMenu();
  };
  const MenuButton = (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title='Menu' iconSize={iconSize} color={color} iconName={isAndroid()?'md-ellipsis-vertical':'ios-ellipsis-vertical'} onPress={showMenu} />
    </HeaderButtons>
  );
  return (
    <View style={styles.menuWrapper}>
      <Menu ref={menuRef} button={MenuButton}>
        {data.map((item, index) => (
          <Fragment key={index}>
            <MenuItem
              textStyle={styles.singleMenuItemText}
              key={index}
              onPress={() => itemClicked(item.id)}
            >
              {item.label}
            </MenuItem>
            <MenuDivider />
          </Fragment>
        ))}
      </Menu>
    </View>
  );
};
export default MaterialMenu;
const styles = StyleSheet.create({
  menuWrapper: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  singleMenuItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
