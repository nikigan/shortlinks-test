import React from 'react';
import './CreateLinkForm.scss';
import { Button, Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import 'moment/locale/ru';
import { useDispatch } from 'react-redux';
import { createLink } from '../../store/shortlink/actions';

moment.locale('ru');

const CreateLinkForm = () => {

    const { register, control, handleSubmit, errors } = useForm();

    const dispatch = useDispatch();

    return (
        <div>
            <form onSubmit={handleSubmit(data => dispatch(createLink(data)))} className="link-form" noValidate autoComplete="off">
                <TextField className="link-form__url-field"
                           label="Ссылка"
                           required
                           error={!!errors.redirect_url}
                           helperText={!!errors.redirect_url && "Необходимо ввести ссылку" }
                           placeholder="https://google.com"
                           defaultValue="https://"
                           name="redirect_url"
                           inputRef={register({ required: true})}/>
                <div className="link-options">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <TextField className="link-options__field link-options__text"
                                       label="Свой текст ссылки"
                                       placeholder="my-coolest-link"
                                       name="custom_shortlink"
                                       error={!!errors.custom_shortlink}
                                       helperText={!!errors.custom_shortlink && "Длина ссылки не менее 5 символов"}
                                       inputRef={register( { minLength: 5})}/>
                        </Grid>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <Grid item xs={12} md={4}>
                                <Controller
                                    name="end_date"
                                    control={control}
                                    defaultValue={moment().add(1, 'days')}
                                    render={({ onChange, value }) =>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            className="link-options__field link-options__date"
                                            variant="inline"
                                            format="DD/MM/yyyy"
                                            minDate={moment().add(1, 'days')}
                                            value={value}
                                            onChange={onChange}
                                            label="Дата окончания действия ссылки"
                                        />}/>
                            </Grid>
                        </MuiPickersUtilsProvider>
                        <Grid item xs={12} md={4}>
                            <FormControlLabel
                                control={<Checkbox color="primary" inputRef={register} name="commercial" />}
                                label="Коммерческая ссылка"
                            />
                        </Grid>
                    </Grid>
                    <div className="text-right mt-5">
                    <Button type="submit" variant="contained" color="primary">
                        Уменьшить
                    </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateLinkForm;
