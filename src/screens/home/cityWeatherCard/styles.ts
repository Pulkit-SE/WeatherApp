import {createThemedStyles} from '../../../utils/theme/createThemedStyles';

export const styles = createThemedStyles(colors => ({
  container: {
    borderRadius: 8,
    backgroundColor: colors.card,
    width: '100%',
    height: 200,
    marginTop: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cityText: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '500',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.placeholderText,
    marginTop: 8,
  },
  degreeContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  tempText: {
    fontSize: 72,
    fontWeight: '400',
    color: colors.text,
  },
  unitText: {
    fontSize: 32,
    fontWeight: '500',
    color: colors.text,
    marginTop: 8,
    marginLeft: 4,
  },
  imgStyle: {
    width: 150,
    height: 120,
  },
  weatherText: {
    fontSize: 16,
    color: colors.placeholderText,
  },
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  parentContainer: {
    flex: 1,
  },
}));
