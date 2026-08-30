import { useAuth } from "@/context/AuthContext"
import api from "@/utils/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
// creates course
export const useCreateCourse = () => {
    return useMutation({
        mutationFn: async (data) => {
            const res = await api.post('/course/createNew', data)
            return res.data
        }
    })
}
// update course status
export const usePublishCourse = () => {
    return useMutation({
        mutationFn: ({ courseId, status }) => {
            const res = api.put(`/course/${courseId}/status`, { status })
            return res.data
        }
    })
}
export const useBuyCourse = () => {
    const queryClient =  useQueryClient()
                const { user } = useAuth()

    return useMutation({
        mutationFn: async ({ course_id }) => {
            const res = await api.post(`/course/buy-course/${course_id}`)
            const { order, key } = res.data
            const options = {
                key,
                amount: order.amount,
                currency: order.currency,
                order_id: order.id,
                name: 'Skillnest',
                description: 'Course Purchase',
                handler: async function (response) {
                    const res = await api.post('/course/payment/verify', {
                        orderId: response.razorpay_order_id,
                        paymentId: response.razorpay_payment_id,
                        signature: response.razorpay_signature
                    })
                },
                prefill: {
                    name: user?.name,
                    email: user?.email
                }
            }
            const razorpay = new window.Razorpay(options)
            razorpay.open()
        },
        onSuccess:async(_,variables)=>{
await queryClient.invalidateQueries({
    queryKey:['course',variables.course_id]
})

        },
        
    })
}
export const useFreeCourse = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:async({course_id})=>{
      const res = await api.post(`/course/enroll/${course_id}`)
    },
    onSuccess:async(_,variables)=>{
await queryClient.invalidateQueries({
    queryKey:['course',variables.course_id]
})
    }
})
}
// delete course only by teacher 
export const useDeleteCourse = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ( courseId ) => {
            await api.delete(`/course/${courseId}`)
        },
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({
                queryKey: ['coursesTeacher']
            })
        }
    })
}
// create section 
export const useCreateSection = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ courseId, title }) => {
            const res = await api.post(`/course/${courseId}/create-section`, { title })
            return res.data
        },
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({
                queryKey: ['sections', variables.courseId]
            })
        }

    })

}
// edit section
export const useEditSection = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ sectionId, title }) => {
            const res = await api.put(`/course/section/${sectionId}/edit-section`, { title })
            return res.data
        },
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({
                queryKey: ['sections', variables.courseId]
            })
        }

    })
}
// delete section
export const useDeleteSection = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ sectionId, courseId }) => {
            const res = await api.delete(`/course/section/${sectionId}/delete`)
        },
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({
                queryKey: ['sections', variables.courseId]
            })
        }
    })
}
// create Lesson
export const useCreateLesson = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ sectionId, lesson, courseId }) => {
            const res = await api.post(`/course/lesson/${sectionId}/create-lesson`, { lesson })
            return res.data
        },
        onSuccess: async (_, variables) => {

            await Promise.all([queryClient.invalidateQueries({
                queryKey: ['sections', variables.courseId],
            }),
            queryClient.invalidateQueries({
                queryKey: ['lessons', variables.sectionId]
            })
            ])
        }
    }
    )
}
// edit lesson
export const useEditLesson = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ lessonId, title, description }) => {
            const res = await api.put(`/course/lesson/${lessonId}/update`, { title, description })
        },
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({
                queryKey: ['lessons', variables.sectionId]
            })
        }
    })
}
// upload resources
export const useUpdateUploadedResources = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ resourceForm, lessonId }) => {

            if (resourceForm.type === 'pdf' || resourceForm.type === 'doc') {
                const form = new FormData()
                resourceForm.files.forEach((resource) => {
                    form.append('title', resource.title)
                    form.append('resource', resource.file)
                    form.append('type', resourceForm.type)
                })
                await api.put(`/course/lesson/${lessonId}/resource-upload`, form)
            } else {
                await api.put(`/course/lesson/${lessonId}/resource-upload`, resourceForm)
            }

        },
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({
                queryKey: ['resources', variables.lessonId],
            })
        }
    })
}
// delete uploaded resources
export const useDeleteResources = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ lessonId, resourceId, sectionId }) => {
            const res = await api.delete(`/course/lesson/${lessonId}/resource/${resourceId}/delete`)
        },
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({
                queryKey: ['resources', variables.lessonId],
            })

        }
    })
}
export const useVideoUpload = () => {
    return useMutation({
        mutationFn: async ({ video, lessonId }) => {
            const form = new FormData()
            form.append('video', video)
            await api.put(`/course/lesson/${lessonId}/update`, form)
        },
    })
}
// delete lesson
export const useDeleteLesson = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ sectionId, courseId }) => {
            await api.delete(`/course/lesson/${sectionId}/delete`)
        },
        onSuccess: async (_, variables) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ['sections', variables.courseId]
                }),
                queryClient.invalidateQueries({
                    queryKey: ['lessons', variables.sectionId]
                })
            ])
        }
    })
}
export const useMarkLessonComplete = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ enrollmentId, lessonId, courseId, sectionId }) => {
            const res = await api.put(`/student/enrolledCourse/${enrollmentId}/${lessonId}/completed`)
            return res.data
        },
        onSuccess: async (_, variables) => {
            await Promise.all([
                 queryClient.invalidateQueries({
                    queryKey:['enrolledCourse',variables.enrollmentId]
                }),
                 queryClient.invalidateQueries({
                    queryKey: ['sections', variables.courseId]
                }),
                 queryClient.invalidateQueries({
                    queryKey: ['lessons', variables.sectionId]
                }),
                 queryClient.invalidateQueries({
                    queryKey:['ceritificates']
                }),
                queryClient.invalidateQueries({
  queryKey: ['certificate', variables.enrollmentId]
})

            ])
        }
    })
}