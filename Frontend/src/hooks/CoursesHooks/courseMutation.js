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
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ['resources', variables.lessonId],
                }),
                queryClient.invalidateQueries({
                    queryKey: ['lessons', variables.sectionId]
                })

            ])
        }
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
