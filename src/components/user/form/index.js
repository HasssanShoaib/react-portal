import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Grid from 'material-ui/Grid';
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from 'material-ui/Form';

const styles = theme => ( {
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: 300,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  group: {
    margin: `${ theme.spacing.unit }px 0`,
  },
} );

class UserForm extends React.Component {
  state = {
    displayName: '',
    location: '',
    website: '',
    gender: 'female',
    genderValid: true,
    locationValid: true,
    displayNameValid: true,
    websiteValid: true,
  };

  onSubmit = ( e ) => {
    e.preventDefault();

    const isDisplayNameValid = this.state.displayName !== '';
    const isGenderValid = this.state.gender !== '';
    const isLocationValid = this.state.location !== '';
    const isWebsiteValid = this.state.website !== '';

    if (
      isDisplayNameValid &&
      isGenderValid &&
      isLocationValid &&
      isWebsiteValid
    ) {
      this.props.createUser(
        this.state.displayName,
        this.state.gender,
        this.state.location,
        this.state.website,
      );

      this.setState( {
        displayNameValid: isDisplayNameValid,
        genderValid: isGenderValid,
        locationValid: isLocationValid,
        websiteValid: isWebsiteValid,
        displayName: '',
        gender: '',
        location: '',
        website: '',
      } );

      // console.log('creds', creds);
      // this.props.onLogin( creds );
    } else {
      this.setState( {
        displayNameValid: isDisplayNameValid,
        locationValid: isLocationValid,
        genderValid: isGenderValid,
        websiteValid: isWebsiteValid,
      } );
    }
  };

  onChange = ( e ) => {
    this.setState( {
      [ e.target.name ]: e.target.value,
      [ `${ e.target.name }Valid` ]: e.target.value,
    } );
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl} required>
              <InputLabel htmlFor="displayName">Display Name</InputLabel>
              <Input
                id="displayName"
                name="displayName"
                type="text"
                value={this.state.displayName}
                onChange={e => this.onChange( e )}
              />
              <FormHelperText
                id="displayName-helper-text"
                error={!this.state.displayNameValid}
              >
                {this.state.displayNameValid ? '' : 'Display name is missing'}
              </FormHelperText>
            </FormControl>
            <FormControl
              component="fieldset"
              required
              className={classes.formControl}
            >
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                className={classes.group}
                value={this.state.gender}
                onChange={e => this.onChange( e )}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl} required>
              <InputLabel htmlFor="location">Location</InputLabel>
              <Input
                id="location"
                name="location"
                type="text"
                value={this.state.location}
                onChange={e => this.onChange( e )}
              />
              <FormHelperText
                id="location-helper-text"
                error={!this.state.location}
              >
                {this.state.locationValid ? '' : 'Location is missing'}
              </FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl} required>
              <InputLabel htmlFor="website">Website</InputLabel>
              <Input
                id="website"
                name="website"
                type="text"
                value={this.state.website}
                onChange={e => this.onChange( e )}
              />
              <FormHelperText
                id="website-helper-text"
                error={!this.state.website}
              >
                {this.state.locationValid ? '' : 'Website is missing'}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <Button
                disabled={
                  !this.state.displayNameValid ||
                  !this.state.genderValid ||
                  !this.state.locationValid ||
                  !this.state.websiteValid
                }
                variant="raised"
                color="primary"
                className={classes.button}
                onClick={e => this.onSubmit( e )}
              >
                Submit
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    );
  }
}

UserForm.propTypes = {
  classes: PropTypes.object.isRequired,
  createUser: PropTypes.func.isRequired,
};

export default withStyles( styles )( UserForm );
