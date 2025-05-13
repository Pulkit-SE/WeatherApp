import {createThemedStyles} from '../../utils/theme/createThemedStyles';

export const styles = createThemedStyles(colors => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  textInput: {
    backgroundColor: colors.background,
    color: colors.text,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    width: '80%',
  },
  searchBtn: {
    backgroundColor: colors.card,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchText: {
    color: colors.text,
  },
  emptyImg: {
    height: 320,
    width: 320,
    resizeMode: 'contain',
    marginTop: 20,
    alignSelf: 'center',
  },
  imgContainer: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  searchCityText: {
    color: colors.text,
    fontSize: 16,
    marginTop: 16,
  },
  activity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
