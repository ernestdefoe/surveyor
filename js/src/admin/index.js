import { Admin } from 'flarum/common/extenders';
import SurveyorPage from './SurveyorPage';
import { t } from './util';

const key = (name) => `ernestdefoe-surveyor.${name}`;

// `extra` is a function too: nothing here may call the translator before boot.
const field =
  (name, type, extra = () => ({})) =>
  () => ({
    setting: key(name),
    type,
    label: t(`settings.${name}_label`),
    help: t(`settings.${name}_help`),
    ...extra(),
  });

// Callbacks, not values: this module runs before the app has booted. The
// settings are shown in the workspace's Settings section.
export const extend = [
  new Admin()
    .page(SurveyorPage)
    .setting(
      field('audit_frequency', 'select', () => ({
        options: {
          daily: t('settings.frequency_daily'),
          weekly: t('settings.frequency_weekly'),
          monthly: t('settings.frequency_monthly'),
          manual: t('settings.frequency_manual'),
        },
        default: 'weekly',
      }))
    )
    .setting(field('max_pages', 'number', () => ({ min: 10, max: 20000 })))
    .setting(field('pages_per_minute', 'number', () => ({ min: 1, max: 120 })))
    .setting(field('timeout', 'number', () => ({ min: 2, max: 20 })))
    .setting(field('keep_runs', 'number', () => ({ min: 2, max: 100 }))),
];
